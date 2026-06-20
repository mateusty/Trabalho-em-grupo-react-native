import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { z } from 'zod';
import Toast from 'react-native-toast-message';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { supabase } from '../../services/supabaseClient';
import { PcdModal } from '../../components/Modal/pcdModal';
import { UserProfile } from '../../types/auth';
import { PickerField } from '../../components/Picker/PickerField';
import { TIPOS_DEFICIENCIA } from '../../types/deficiencias';
import { GOOGLE_WEB_CLIENT_ID } from '../../config';

// Configuração do Google (fora do componente)
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

// Schemas
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

const signUpSchema = z
  .object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Senha mínima de 6 caracteres'),
    confirmPassword: z.string(),
    tipo_deficiencia: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  });

// Componente principal
export const LoginCadastro = () => {
  const { signIn, signUp, isLoading, loginWithSocial } = useAuth();
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');

  // Campos comuns
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Campos de cadastro
  const [nome, setNome] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tipo_deficiencia, setTipo_deficiencia] = useState('nenhuma');

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Modal PCD
  const [showModal, setShowModal] = useState(false);
  const [pendingProfile, setPendingProfile] = useState<UserProfile | null>(null);

  // -------------------- Handlers --------------------

  const handleLogin = async () => {
    setErrors({});
    try {
      const data = loginSchema.parse({ email, password });
      await signIn(data.email, data.password);
      Toast.show({ type: 'success', text1: 'Bem-vindo(a) de volta!' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          fieldErrors[field] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        const message = error instanceof Error ? error.message : 'Erro inesperado';
        Toast.show({ type: 'error', text1: 'Erro', text2: message });
      }
    }
  };

  const handleSignUp = async () => {
    setErrors({});
    try {
      const data = signUpSchema.parse({
        nome,
        email,
        password,
        confirmPassword,
        tipo_deficiencia,
      });
      await signUp(data.email, data.password, data.nome, data.tipo_deficiencia);
      Toast.show({
        type: 'success',
        text1: 'Conta criada!',
        text2: 'Agora faça login com suas credenciais.'
      });
      // Limpa campos e alterna para login
      setNome('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTipo_deficiencia('nenhuma');
      setModo('login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          fieldErrors[field] = issue.message;
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error) {
        let message = error.message;
        if (message.includes('rate limit')) {
          message = 'Muitas tentativas. Aguarde alguns minutos.';
        } else if (message.includes('User already registered')) {
          message = 'Este e-mail já está cadastrado. Faça login.';
        }
        Toast.show({ type: 'error', text1: 'Erro no cadastro', text2: message });
      } else {
        Toast.show({ type: 'error', text1: 'Erro', text2: 'Ocorreu um erro inesperado.' });
      }
    }
  };

  // Função auxiliar para buscar ou criar perfil
  const getOrCreateProfile = async (userId: string, email?: string | null, nome?: string | null, foto_url?: string | null) => {
    let { data: perfil } = await supabase
      .from('usuario')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (!perfil) {
      const novoUsuario = {
        id: userId,
        email: email || '',
        nome: nome || 'Usuário Sem Nome',
        data_criacao: new Date().toISOString(),
        tipo_deficiencia: null,
        foto_url: foto_url || null,
      };
      const { data: criado, error: insertError } = await supabase
        .from('usuario')
        .insert([novoUsuario])
        .select()
        .single();
      if (insertError) throw insertError;
      perfil = criado;
    }
    return perfil;
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
      if (!idToken) throw new Error('Token não obtido');

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });
      if (error) throw error;
      if (!data.user) throw new Error('Usuário não retornado');

      const perfil = await getOrCreateProfile(
        data.user.id,
        data.user.email,
        data.user.user_metadata?.full_name,
        data.user.user_metadata?.picture
      );

      if (!perfil.tipo_deficiencia || perfil.tipo_deficiencia === '') {
        setPendingProfile(perfil);
        setShowModal(true);
      } else {
        loginWithSocial(perfil);
      }
    } catch (error) {
      // Verifica se é erro de cancelamento (Google) 
      // Pelo amor de deus que trabalho complicado
      if (error instanceof Error && 'code' in error && error.code === statusCodes.SIGN_IN_CANCELLED) {
        return; // usuário cancelou
      }
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      Toast.show({ type: 'error', text1: 'Erro Google', text2: message });
    }
  };

  const handleModalComplete = (updatedProfile: UserProfile) => {
    setShowModal(false);
    loginWithSocial(updatedProfile);
  };

  // -------------------- Render --------------------

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>

        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Image source={require('../../assets/logo.png')} style={{ width: 80, height: 80 }} resizeMode="contain" />
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 8 }}>Via Livre</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, modo === 'login' && styles.tabActive]} onPress={() => setModo('login')}>
            <Text style={[styles.tabText, modo === 'login' && styles.tabTextActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, modo === 'cadastro' && styles.tabActive]} onPress={() => setModo('cadastro')}>
            <Text style={[styles.tabText, modo === 'cadastro' && styles.tabTextActive]}>Cadastro</Text>
          </TouchableOpacity>
        </View>

        {modo === 'login' ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errors={errors}
            isLoading={isLoading}
            onSubmit={handleLogin}
          />
        ) : (
          <SignUpForm
            nome={nome}
            setNome={setNome}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            tipo_deficiencia={tipo_deficiencia}
            setTipo_deficiencia={setTipo_deficiencia}
            errors={errors}
            isLoading={isLoading}
            onSubmit={handleSignUp}
          />
        )}

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>ou</Text>
          <View style={styles.separatorLine} />
        </View>

        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleLogin}
          style={styles.googleButton}
        />

        <Text style={styles.footerText}>
          Compatível com leitores de tela e navegação por teclado.
        </Text>
      </ScrollView>

      <PcdModal visible={showModal} userProfile={pendingProfile!} onComplete={handleModalComplete} />
    </KeyboardAvoidingView>
  );
};

// -------------------- Subcomponentes --------------------

interface LoginFormProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  errors: Record<string, string>;
  isLoading: boolean;
  onSubmit: () => void;
}

const LoginForm = ({ email, setEmail, password, setPassword, errors, isLoading, onSubmit }: LoginFormProps) => (
  <>
    <Field label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" error={errors.email} autoCapitalize="none" keyboardType="email-address" />
    <Field label="Senha" value={password} onChange={setPassword} placeholder="********" error={errors.password} secureTextEntry />
    <TouchableOpacity style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
    </TouchableOpacity>
    <SubmitButton onPress={onSubmit} loading={isLoading} text="Entrar" />
  </>
);

interface SignUpFormProps {
  nome: string;
  setNome: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  tipo_deficiencia: string;
  setTipo_deficiencia: (v: string) => void;
  errors: Record<string, string>;
  isLoading: boolean;
  onSubmit: () => void;
}

const SignUpForm = ({
  nome, setNome, email, setEmail, password, setPassword,
  confirmPassword, setConfirmPassword, tipo_deficiencia, setTipo_deficiencia,
  errors, isLoading, onSubmit,
}: SignUpFormProps) => (
  <>
    <Field label="Nome" value={nome} onChange={setNome} placeholder="Seu nome" error={errors.nome} />
    <Field label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" error={errors.email} autoCapitalize="none" keyboardType="email-address" />
    <Field label="Senha" value={password} onChange={setPassword} placeholder="********" error={errors.password} secureTextEntry />
    <Field label="Confirmar Senha" value={confirmPassword} onChange={setConfirmPassword} placeholder="********" error={errors.confirmPassword} secureTextEntry />
    <PickerField
      label="Tipo de Deficiência (opcional)"
      selectedValue={tipo_deficiencia}
      onValueChange={setTipo_deficiencia}
      items={TIPOS_DEFICIENCIA}
      error={errors.tipo_deficiencia}
    />
    <SubmitButton onPress={onSubmit} loading={isLoading} text="Cadastrar" />
  </>
);

// -------------------- Componentes reutilizáveis --------------------

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const Field = ({ label, value, onChange, placeholder, error, secureTextEntry, autoCapitalize, keyboardType }: FieldProps) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={[styles.fieldInput, error && styles.fieldInputError]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize || 'sentences'}
      keyboardType={keyboardType || 'default'}
    />
    {error && <Text style={styles.fieldError}>{error}</Text>}
  </View>
);

interface SubmitButtonProps {
  onPress: () => void;
  loading: boolean;
  text: string;
}

const SubmitButton = ({ onPress, loading, text }: SubmitButtonProps) => (
  <TouchableOpacity style={styles.submitButton} onPress={onPress} disabled={loading}>
    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>{text}</Text>}
  </TouchableOpacity>
);

// -------------------- Estilos --------------------
const styles = {
  tabContainer: {
    flexDirection: 'row' as const,
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center' as const,
  },
  tabActive: {
    backgroundColor: '#3B75B0',
  },
  tabText: {
    color: '#333',
    fontWeight: 'bold' as const,
  },
  tabTextActive: {
    color: '#fff',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontWeight: '500' as const,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    backgroundColor: '#f9f9f9',
  },
  fieldInputError: {
    borderColor: 'red',
  },
  fieldError: {
    color: 'red',
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end' as const,
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#3B75B0',
  },
  submitButton: {
    backgroundColor: '#3B75B0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center' as const,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold' as const,
    fontSize: 16,
  },
  separator: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#666',
  },
  googleButton: {
    width: '100%' as const,
    height: 48,
  },
  footerText: {
    textAlign: 'center' as const,
    color: '#999',
    fontSize: 12,
    marginTop: 24,
  },
};