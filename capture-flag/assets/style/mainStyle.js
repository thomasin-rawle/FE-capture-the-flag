import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loadingScreen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1CBF8E'
	},
	loadingLogo: {
		width: 150,
        resizeMode: 'contain',
	},
	recenterBtn: {
		position: 'absolute',
		bottom: 40,
		right: 20,
		backgroundColor: 'white',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 150,
		width: 60,
		height: 60,
		shadowColor: '#333',
		shadowOpacity: 0.4,
		shadowOffset: { width: 4, height: 4 },
		elevation: 5
    },
    topBar: {
        backgroundColor: '#1CBF8E',
        paddingTop:30,
        height:80
      },
      user: {
        color: 'white',
        alignItems: 'flex-start',
        flex: 1,
        paddingLeft:20
      },
      logo: {
        alignItems: 'center',
        flex: 1
      },
      logoLong: {
        width: 100,
        resizeMode: 'contain',
    },
      score: {
        color: 'white',
        display: 'flex',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight:20
      },
      scoreNumber: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 5
      },
      
})

export default styles