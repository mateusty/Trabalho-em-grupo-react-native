import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
    paddingBottom: 4,
  },
  tabBarItem: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 6,
  },
  tabBarIconGlobal: {
    marginTop: 4,
  },
  tabBarContainer: {
    borderColor: '#777',
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  botaoFlutuante: {
    borderRadius: 29, 
    height: 58,
    width: 58,
    backgroundColor: '#E65E2A',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 10px #E65E2A',
    borderWidth: 4,
    borderColor: 'white',
    marginTop: -15,
  },
});