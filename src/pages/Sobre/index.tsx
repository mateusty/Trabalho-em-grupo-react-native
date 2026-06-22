import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const COLOR = {
  brand: '#3B75B0',
  surface: '#FFFFFF',
  surfaceMuted: '#F8F9FA',
  border: '#E2E2E2',
  textPrimary: '#1A1A1A',
  textSecondary: '#494949',
  textMuted: '#777777',
} as const;

const FONT = {
  regular: 'Montserrat-Regular',
  bold: 'Montserrat-Bold',
} as const;

const RADIUS = { sm: 8, md: 12, lg: 16 } as const;

interface StatItem {
  value: string;
  label: string;
}

interface SectionItem {
  icon: string;
  heading: string;
  body: string;
}

interface AudienceItem {
  id: string;
  icon: string;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  { value: '2.400+', label: 'obstáculos\nmapeados' },
  { value: '180+', label: 'bairros\ncobertos' },
  { value: '12 mil', label: 'usuários\nativos' },
];

const SECTIONS: SectionItem[] = [
  {
    icon: '🎯',
    heading: 'Nossa missão',
    body:
      'Construir, de forma colaborativa e contínua, um mapa vivo e participativo dos obstáculos de acessibilidade urbana como rampas quebradas, elevadores fora de operação, calçadas intransitáveis, semáforos sem sinalização sonora e faixas malconservadas. Nosso objetivo é garantir que nenhuma rota seja uma surpresa desagradável e que cada deslocamento seja planejado com segurança, previsibilidade e dignidade.',
  },
  {
    icon: '⚙️',
    heading: 'Como funciona',
    body:
      'Qualquer pessoa moradora, visitante ou profissional pode registrar um obstáculo em poucos segundos por meio de dispositivos móveis, com foto, geolocalização e descrição objetiva. A comunidade assume um papel ativo: valida, complementa, corrige e comenta cada relato, garantindo que o mapa se mantenha atualizado em tempo real e com alta confiabilidade. Cada contribuição transforma uma experiência individual em um dado concreto e útil, que empodera quem mais precisa a planejar rotas seguras e evitar surpresas no dia a dia.',
  },
  {
    icon: '💡',
    heading: 'Por que isso importa',
    body:
      'No Brasil, mais de 17 milhões de pessoas convivem com algum tipo de deficiência motora, visual, auditiva ou intelectual. Para muitas delas, uma calçada irregular, uma rampa interditada ou um elevador quebrado não é um mero incômodo: pode significar a perda de uma consulta médica, o atraso para uma entrevista de trabalho, a impossibilidade de levar os filhos à escola ou, em casos extremos, o desestímulo permanente a sair de casa. Além desse público, o mapa beneficia idosos, gestantes, pessoas com carrinhos de bebê, ciclistas e todos que desejam trajetos mais previsíveis. A acessibilidade, quando bem mapeada, torna-se um bem coletivo que transforma cidades inteiras.',
  },
];

const AUDIENCE: AudienceItem[] = [
  { id: 'wheelchair', icon: '♿', label: 'Cadeirantes', description: 'Rotas livres de barreiras físicas' },
  { id: 'lowvision', icon: '👁️', label: 'Baixa visão', description: 'Alertas sobre pisos e obstáculos' },
  { id: 'elderly', icon: '🚶', label: 'Idosos', description: 'Caminhos seguros e sinalizados' },
  { id: 'stroller', icon: '🍼', label: 'Famílias com carrinho', description: 'Acesso nivelado e sem degraus' },
];

const Header: React.FC = () => (
  <View style={styles.header}>
    <View style={styles.logoMark}>
      <Text style={styles.logoMarkText}>VL</Text>
    </View>
    <View>
      <Text style={styles.eyebrow}>Sobre o app</Text>
      <Text style={styles.appName}>Via Livre</Text>
    </View>
  </View>
);

const Tagline: React.FC = () => (
  <Text style={styles.tagline}>
    Transformamos o caminho até o ponto de ônibus numa rota que qualquer pessoa
    pode percorrer com confiança.
  </Text>
);

const StatsRow: React.FC = () => (
  <View style={styles.statsRow}>
    {STATS.map((stat, i) => (
      <React.Fragment key={stat.label}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
        {i < STATS.length - 1 && <View style={styles.statDivider} />}
      </React.Fragment>
    ))}
  </View>
);

const InfoSection: React.FC<{ item: SectionItem }> = ({ item }) => (
  <View style={styles.infoSection}>
    <View style={styles.infoSectionHeader}>
      <Text style={styles.infoIcon}>{item.icon}</Text>
      <Text style={styles.infoHeading}>{item.heading}</Text>
    </View>
    <Text style={styles.infoBody}>{item.body}</Text>
  </View>
);

const AudienceCard: React.FC<{ item: AudienceItem }> = ({ item }) => (
  <View style={styles.audienceCard}>
    <Text style={styles.audienceIcon}>{item.icon}</Text>
    <Text style={styles.audienceLabel}>{item.label}</Text>
    <Text style={styles.audienceDesc}>{item.description}</Text>
  </View>
);

const Quote: React.FC = () => (
  <View style={styles.quoteBlock}>
    <View style={styles.quoteAccent} />
    <View style={styles.quoteContent}>
      <Text style={styles.quoteText}>
        "Cada obstáculo reportado é uma barreira a menos no caminho de alguém."
      </Text>
      <Text style={styles.quoteAttrib}>Time Via Livre</Text>
    </View>
  </View>
);

const Footer: React.FC = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>
      Via Livre é um projeto estudantil independente, desenvolvido com o
      propósito de tornar a cidade mais acessível para todos.
    </Text>
    <Text style={styles.footerVersion}>Versão 1.0.0</Text>
  </View>
);

export const Sobre: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.surfaceMuted} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <Tagline />
        <StatsRow />

        <View style={styles.divider} />

        <View style={styles.sectionsBlock}>
          {SECTIONS.map((section) => (
            <InfoSection key={section.heading} item={section} />
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.audienceBlock}>
          <Text style={styles.sectionLabel}>Para quem</Text>
          <View style={styles.audienceGrid}>
            {AUDIENCE.map((item) => (
              <AudienceCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        <Quote />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLOR.surfaceMuted,
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 48,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLOR.brand,
    alignItems: 'center',

    justifyContent: 'center',
  },
  logoMarkText: {
    fontSize: 16,
    fontFamily: FONT.bold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: FONT.bold,
    color: COLOR.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  appName: {
    fontSize: 24,
    fontFamily: FONT.bold,
    color: COLOR.textPrimary,
    letterSpacing: -0.3,
  },

  tagline: {
    fontSize: 15,
    fontFamily: FONT.regular,
    color: COLOR.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLOR.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 0.5,
    borderColor: COLOR.border,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontFamily: FONT.bold,
    color: COLOR.brand,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: FONT.regular,
    color: COLOR.textMuted,
    textAlign: 'center',
    lineHeight: 15,
  },
  statDivider: {
    width: 0.5,
    backgroundColor: COLOR.border,
    marginVertical: 4,
  },

  divider: {
    height: 0.5,
    backgroundColor: COLOR.border,
    marginVertical: 24,
  },

  sectionsBlock: {
    gap: 20,
  },
  infoSection: {
    gap: 8,
  },
  infoSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoIcon: {
    fontSize: 17,
  },
  infoHeading: {
    fontSize: 15,
    fontFamily: FONT.bold,
    color: COLOR.textPrimary,
  },
  infoBody: {
    fontSize: 14,
    fontFamily: FONT.regular,
    color: COLOR.textSecondary,
    lineHeight: 22,
    paddingLeft: 26,
  },

  audienceBlock: {
    gap: 14,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: FONT.bold,
    color: COLOR.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  audienceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  audienceCard: {
    width: '47.5%',
    backgroundColor: COLOR.surface,
    borderRadius: RADIUS.md,
    borderWidth: 0.5,
    borderColor: COLOR.border,
    padding: 14,
    gap: 4,
  },
  audienceIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  audienceLabel: {
    fontSize: 13,
    fontFamily: FONT.bold,
    color: COLOR.textPrimary,
  },
  audienceDesc: {
    fontSize: 12,
    fontFamily: FONT.regular,
    color: COLOR.textMuted,
    lineHeight: 17,
  },

  quoteBlock: {
    flexDirection: 'row',
    marginTop: 28,
    marginBottom: 28,
    gap: 14,
  },
  quoteAccent: {
    width: 3,
    borderRadius: 2,
    backgroundColor: COLOR.brand,
  },
  quoteContent: {
    flex: 1,
    gap: 6,
  },
  quoteText: {
    fontSize: 14,
    fontFamily: FONT.regular,
    fontStyle: 'italic',
    color: COLOR.textSecondary,
    lineHeight: 22,
  },
  quoteAttrib: {
    fontSize: 12,
    fontFamily: FONT.bold,
    color: COLOR.textMuted,
  },

  footer: {
    gap: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: FONT.regular,
    color: COLOR.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerVersion: {
    fontSize: 11,
    fontFamily: FONT.regular,
    color: COLOR.textMuted,
    opacity: 0.6,
  },
});