import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: '#E2E2E2'
  },

  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1A1A1A'
  },

  subTitle: {
    fontWeight: '300',
    color: '#494949'
  },

  contentContainer: {
    flex: 1,
    width: '100%',
    marginTop: 26,
  },

  filterButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  mapContainer: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E2E2E2',
    marginTop: 10,
    position: 'relative',
  },

  map: {
    width: '100%',
    height: '100%'
  },

  accessibilityLevelCaption: {
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 8,
    borderRadius: 25,
    paddingVertical: 16
  },

  captionTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },

  captionText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600'
  },

  accessibleMapButton: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    marginTop: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  accessibleMapButtonText: {
    color: '#F8F9FA',
    fontSize: 22,
    fontWeight: '600'
  }
});