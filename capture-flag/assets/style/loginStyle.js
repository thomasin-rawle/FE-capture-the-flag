import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loginContainer: {
		flex: 1,
        backgroundColor: '#1CBF8E',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoLoginContainer: {
        alignItems: 'center',
        marginBottom: 20,
       
    },
    logoLogin: {
        height: 163,
        resizeMode: 'contain',
    },
    loginInputContainer: {
        marginVertical: 10,
        paddingVertical: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 3,
        width:240
    },
    loginInput: {
        fontSize: 20,
        color: '#fff',
        paddingHorizontal:10,
    },
    loginBtnContainer: {
        display: 'flex',
        alignItems:"center",
        marginTop: 40
    },
	loginBtnText: {
		textAlign: 'center',
		color: '#1CBF8E',
        fontWeight: '700',
        fontSize: 20,
	},
	loginBtn: {
		backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        width: 180,
    },
    signupBtn: {
        marginTop:20,
        padding:10
    },
    signupBtnText: {
        color:'#fff',
        fontSize:18,
    },
    backBtn: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 100
    }
})

export default styles