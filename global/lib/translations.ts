export const mockData: any = {
  banner: {
    description_portuguese: 'A plataforma definitiva para atletas e arenas de elite.',
    description_ingles: 'The ultimate platform for elite athletes and arenas.',
    description_espanhol: 'La plataforma definitiva para atletas y arenas de élite.',
    images: [
      'https://images.unsplash.com/photo-1770237711452-037a780f2a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBwbGF5ZXIlMjBhY3Rpb24lMjBzdGFkaXVtfGVufDF8fHx8MTc3NTc1MTg2MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1773949140364-db70d8d87967?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwZHVuayUyMGdhbWV8ZW58MXx8fHwxNzc1NzUxODYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1774600328263-c52a77bd7408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMHRlbm5pcyUyMG1hdGNoJTIwY291cnR8ZW58MXx8fHwxNzc1NzUxODYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  header: {
    Arenas: {
      portuguese: 'Para Arenas',
      ingles: 'For Arenas',
      espanhol: 'Para Arenas',
      link: '/arenas',
    },
    Works: {
      portuguese: 'Como Funciona',
      ingles: 'How It Works',
      espanhol: 'Cómo Funciona',
      link: '/#how-it-works',
    },
    App: {
      portuguese: 'O App',
      ingles: 'The App',
      espanhol: 'La App',
      link: '/#app',
    },
    Partner: {
      portuguese: 'Seja um Parceiro',
      ingles: 'Become a Partner',
      espanhol: 'Hazte Socio',
      link: '/arenas',
    },
  },
};

export const getLangKey = (lang: string) => {
  switch (lang) {
    case 'en':
      return 'ingles';
    case 'es':
      return 'espanhol';
    default:
      return 'portuguese';
  }
};
