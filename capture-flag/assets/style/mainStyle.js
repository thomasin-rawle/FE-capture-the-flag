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
    recenterBtnIcon: {
      color: '#1CBF8E'
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
      // drawerContainer: {
      //   display:'flex',
      //   justifyContent:'center',
      //   alignItems:'center',
      //   padding: 20
      // },
      drawerItem: {
        fontSize:20,
        color: '#616161'
      },
      userDrawerContainer: {
        backgroundColor:'#FFFFFF', 
        paddingTop:70,
        paddingHorizontal: 30,
       
      },
      logOutButtonContainer: {
          alignItems:'center',
          flex: 1,
          justifyContent:'flex-end',
      },
      logOutButton: {
          padding: 10,
          borderRadius: 10,
          width: 150,
          backgroundColor: '#1CBF8E',
          alignItems: 'center',
          marginTop: 20,
          bottom:50
      },
      profilePicContainer:{
        width:70,
        height:70,
        borderRadius:100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      },
      profilePic: {
        maxWidth: 70,
        resizeMode: 'contain'
      },
      namesContainer: {
        marginTop: 20,
        paddingLeft:5
      },
      name: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 5
      },
      drawerLine: {
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 2,
        marginVertical: 30
      },
      statsContainer: {
        paddingLeft: 5
      },
      drawerStatItem: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginVertical: 15
      },
      drawerStat: {
        color: '#616161',
        fontSize:24
      },
      drawerItemIcon: {
        alignItems: 'center',
        width: 40,
        marginRight: 10,
        
      },
      drawerItemStat: {
        marginLeft: 10,
        
      }
      
})

export default styles