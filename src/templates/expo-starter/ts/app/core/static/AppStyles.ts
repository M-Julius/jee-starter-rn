import {StyleSheet} from 'react-native';
import AppColors from './AppColors';

const AppStyles = StyleSheet.create({
  appbar: {
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  hPaddingNormal: {
    paddingHorizontal: 16,
  },
  hMarginNormal: {
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    minHeight: 50,
    padding: 16,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  bottomsheetContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  bottomsheetContent: {
    flex: 1,
    marginTop: 48,
    backgroundColor: 'white',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  bottomsheetContentBase: {
    backgroundColor: 'white',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  centerStretch: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textHeader: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  textMedium: {
    fontSize: 20,
  },
  textNormal: {
    fontSize: 16,
  },
  textSmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  textXs: {
    fontSize: 12,
    lineHeight: 16,
  },
  textH1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    color: AppColors.black,
  },
  textH2: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    color: AppColors.black,
  },
  textH3: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 26,
    color: AppColors.black,
  },
  textH4: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    color: AppColors.black,
  },
  textH5: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    color: AppColors.black,
  },
  textH6: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: AppColors.black,
  },
  textBody18: {
    fontSize: 18,
    lineHeight: 24,
    color: AppColors.black,
  },
  textBody16: {
    fontSize: 16,
    lineHeight: 22,
    color: AppColors.black,
  },
  textBody14: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.black,
  },
  textButton16: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    color: AppColors.black,
  },
  textButton14: {
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.black,
    fontWeight: 'bold',
  },
  textSect: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: AppColors.black,
  },
  textCaption: {
    fontSize: 12,
    lineHeight: 16,
    color: AppColors.black,
  },
  textDate: {
    fontSize: 12,
    lineHeight: 16,
    color: AppColors.medium_grey,
  },
  textStatus: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16,
    color: AppColors.medium_grey,
  },
  textToast: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
  },
  textCaption10: {
    fontSize: 10,
    lineHeight: 16,
    color: AppColors.black,
  },
  link: {
    color: AppColors.orchid,
  },
  linkUnderline: {
    textDecorationLine: 'underline',
  },
  linkBold: {
    fontWeight: 'bold',
  },
  skeletonTitle: {
    height: 26,
  },
  skeletonMedium: {
    height: 20,
  },
  skeletonNormal: {
    height: 16,
  },
  skeletonSmall: {
    height: 14,
  },
  collapsingHeader: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  headerBorderBottom: {
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
  },
  textSelected: {
    fontWeight: 'bold',
  },
  textUnselected: {
    color: AppColors.medium_grey,
  },
});

export default AppStyles;
