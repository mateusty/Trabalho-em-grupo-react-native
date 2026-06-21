import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabaseClient';
import { UserProfile } from '../types/auth';
import Toast from 'react-native-toast-message';

// DESGRAÇA DE AUTHCONTEXT DIFÍCIL ERRO PRA CARAMBA É A ÚLTIMA VEZ QUE VOU MEXER NISSO SE QUEBRAR JA ERA JÁ É SÁBADO

interface AuthContextData {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nome: string, tipo_deficiencia?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
  loginWithSocial: (userProfile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrCreateProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (data) {
      if (!data.tipo_deficiencia || data.tipo_deficiencia === '') {
        const { error: updateError } = await supabase
          .from('usuario')
          .update({ tipo_deficiencia: 'nenhuma' })
          .eq('id', userId);
        if (!updateError) {
          data.tipo_deficiencia = 'nenhuma';
        }
      }
      return data;
    }

    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }

    const { data: userData } = await supabase.auth.getUser();
    const authUser = userData?.user;
    if (!authUser) return null;

    const novoPerfil: UserProfile = {
      id: authUser.id,
      email: authUser.email || '',
      nome: authUser.user_metadata?.full_name || 'Usuário',
      foto_url: authUser.user_metadata?.picture || null,
      tipo_deficiencia: 'nenhuma',
      data_criacao: new Date().toISOString(),
    };

    const { error: insertError } = await supabase.from('usuario').insert([novoPerfil]);
    if (insertError) {
      console.error('Erro ao criar perfil:', insertError);
      return null;
    }
    return novoPerfil;
  };

  useEffect(() => {
    const loadSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const perfil = await fetchOrCreateProfile(session.user.id);
          if (perfil) setUser(perfil);
        }
      } catch (error) {
        console.error('Erro ao carregar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const perfil = await fetchOrCreateProfile(session.user.id);
        if (perfil) setUser(perfil);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error('Usuário não encontrado');
      const perfil = await fetchOrCreateProfile(data.user.id);
      if (!perfil) throw new Error('Perfil não carregado');
      setUser(perfil);
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, nome: string, tipo_deficiencia?: string) => {
    setIsLoading(true);
    try {
      const deficiencia = tipo_deficiencia || 'nenhuma';
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: nome } },
      });
      if (error) {
        if (data?.user) {
          console.warn('Aviso no cadastro (mas usuário criado):', error.message);
        } else {
          throw error;
        }
      }
      if (!data?.user) throw new Error('Erro ao criar usuário');

      const { data: existingProfile } = await supabase
        .from('usuario')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();

      if (!existingProfile) {
        const novoPerfil = {
          id: data.user.id,
          email: data.user.email!,
          nome,
          tipo_deficiencia: deficiencia,
          foto_url: null,
          data_criacao: new Date().toISOString(),
        };

        const { error: insertError } = await supabase.from('usuario').insert([novoPerfil]);
        if (insertError) {
          console.error('Erro ao inserir perfil:', insertError);
          throw insertError;
        }
        console.log('Perfil inserido com sucesso!');
      } else {
        console.log('Perfil já existe, pulando inserção.');
      }

    } catch (error: unknown) {
      console.error('Erro capturado no signUp:', error);
      throw new Error(error instanceof Error ? error.message : 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    Toast.show({ type: 'info', text1: 'Até logo!' });
  };

  const updateUser = async (data: Partial<UserProfile>) => {
    if (!user) return;
    await supabase.from('usuario').update(data).eq('id', user.id);
    setUser(prev => ({ ...prev!, ...data }));
  };

  const loginWithSocial = (userProfile: UserProfile) => setUser(userProfile);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateUser, loginWithSocial }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};