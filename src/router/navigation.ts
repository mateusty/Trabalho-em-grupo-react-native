export type ParametrosRotasStack = {
  StackLogin: undefined;
  DrawerRouter: undefined;
};

export type ParametrosRotasTabs = {
  TabsHome: undefined;
  TabsObstaculos: undefined;
  TabsForm: undefined;
  TabsMapa: undefined;
  OpenDrawer: undefined;
};

export type ParametrosRotasDrawer = {
  TabsRouter: undefined;
  Perfil: undefined;
  Configuracoes: undefined;
  DrawerSobre: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParametrosRotasStack {}
    interface RootParamList extends ParametrosRotasTabs {}
    interface RootParamList extends ParametrosRotasDrawer {}
  }
}