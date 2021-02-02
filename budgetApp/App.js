// import {Button} from 'react-native';
import React, { Component } from "react";
import {TouchableNativeFeedback, Modal, TextInput, FlatList, StyleSheet, Text, View, Alert, SafeAreaView} from 'react-native';
// import Modal from 'modal-react-native-web';


class App extends Component {
  state = {
    modalVisible: false,
      transaction: '',
      description: '',
      transactionType: '',
      Balance: 0.0,
      Income: 0.0,
      Expenses: 0.0,
      transactionData: [],
      keyTrack: 1,
      refreshList: false,
      color: 'red',

  }
   handleTransaction = (text) => {
      this.setState({ transaction: text })
   }
   handleDescritpion = (text) => {
      this.setState({ description: text });
   }

 toggleModal(visible, transType) {
    this.setState({ modalVisible: visible });
    this.setState({transactionType: transType});
 }
 updateVal(amount, transUpdate){
  amount = parseFloat(amount);
  if(Number.isFinite(amount)){

   if(transUpdate == 'Expense'){
     this.state.Expenses += amount;
     amount *= -1;
   }
   else{
    this.state.Income += amount;
  }
   this.state.Balance = this.state.Income - this.state.Expenses;
   this.setState({transactionData: [{key: this.state.keyTrack, descript: this.state.description, amount: amount}, ...this.state.transactionData]});
   this.state.keyTrack += 1;
}
 else {
   Alert.alert('Invalid Input');
}

this.setState({description: ''});
this.state.transaction = '';
 }

 clear() {
  this.setState({description: ''});
  this.state.transaction = '';

 }
 delRow(delKey) {
   let temp = this.state.transactionData;
   for(let i = 0; i < temp.length;i++){
     if(temp[i].key == delKey){
       if(temp[i].amount > 0){
         this.state.Income -= temp[i].amount; 
       }
       else{
         this.state.Expenses += temp[i].amount;
       }
       break;
     }
   }
   this.state.Balance = this.state.Income - this.state.Expenses;

    this.setState({transactionData: this.state.transactionData.filter(something => something.key != delKey)});
     
}

  render() {
  return(

    <View style={{flex: 1, backgroundColor: '#111'}}>
      <View style={{margin: 2, height: 215, borderColor:'blue'}}>

      <View style={myStyles.headerWrapper}>

        <View style={myStyles.headerIncome}>
        <Text style={myStyles.incomeText}>Income: ${this.state.Income.toFixed(2)}</Text>
        </View>

        <View style={myStyles.headerExpense}>
        <Text style={myStyles.expenseText}>Expenses: ${this.state.Expenses.toFixed(2)}</Text>
        </View>

      </View>
      
      <View style={myStyles.headerBalance}>

          <Text style={myStyles.balanceText}>
            Balance: ${this.state.Balance.toFixed(2)}
          </Text>

      </View>

      </View>

      <View style={{height: 80, width:'100%'}}>
        <View style={myStyles.buttonWrap}>

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('blue', false)}>
            <View style={myStyles.buttonStyle1}>
              <Text style={myStyles.buttonStyle} onPress={() => {this.toggleModal(!this.state.modalVisible,"Expense")}}>ADD EXPENSE</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('blue', false)}>
          <View style={myStyles.buttonStyle1}>
            <Text style={myStyles.buttonStyle} onPress={() => {this.toggleModal(!this.state.modalVisible,"Income")}}>ADD INCOME</Text>
          </View>
          </TouchableNativeFeedback>
        </View>
      </View>


      {/* <View style={myStyles.ModalStyle2}> */}
      <Modal animationType='slide' visible={this.state.modalVisible} transparent={true}>
        <View style={{flex:1, backgroundColor:'transparent', justifyContent: 'center', alignItems:'center'}}>

       <View style={{backgroundColor: '#dbdbdb', padding:5, width:'88%', height: 300, borderRadius:10}}>
        <View style={{height:100, width: '100%'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems:'center', padding:3}}>
            <Text style={{flex: 1, height: '48%', fontFamily:'Consolas', fontSize:18, padding:5}}>
              {this.state.transactionType}: 
            </Text>

            <TextInput value={this.state.transaction} placeholder='0.00' 
            style={{ flex: 1, height:'48%', backgroundColor: 'white', fontFamily:'Consolas', paddingLeft:5, fontSize:18}} 
            onChangeText={this.handleTransaction}/>
        
          </View>
        </View>

        
        <View style={{height:100, width: '100%'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems:'center', padding:3}}>
            <Text style={{flex: 1, height: '48%', fontFamily:'Consolas', fontSize:18, padding:5}}>
              Description: 
            </Text>

            <TextInput value={this.state.description} placeholder='Description' 
            style={{ flex: 1, height:'48%', backgroundColor: 'white', fontFamily:'Consolas', paddingLeft:5, fontSize:18}} 
            onChangeText={this.handleDescritpion}/>
        
          </View>
        </View>
     

      <View style={myStyles.buttonWrap}>

      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('blue', false)}>
        <View style={myStyles.buttonStyle1}>
          <Text style={myStyles.buttonStyle} onPress={() => {this.toggleModal(!this.state.modalVisible, this.state.transactionType), this.clear()}}>
            CANCEL
          </Text>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('blue', false)}>
      <View style={myStyles.buttonStyle1}>
          <Text style={myStyles.buttonStyle} onPress= { () => {this.toggleModal(!this.state.modalVisible, this.state.transactionType), this.updateVal(this.state.transaction, this.state.transactionType)}}>
            DONE
          </Text>
      </View>
        </TouchableNativeFeedback>
        
      </View>

      </View>
    </View>
      </Modal>
      {/* </View> */}

      <View style={{height:400, width:'100%', marginBottom: 20}}>
      <FlatList
      extraData={this.state.newData}
        data={this.state.transactionData}
        renderItem={({item}) => 
        <View style={item.amount < 0? myStyles.listStyleExpense : myStyles.listStyleIncome}>

          <Text onPress={() => {this.delRow(item.key)}}
           style={myStyles.listDel}>-</Text>
          <Text style={item.amount < 0? myStyles.listDescriptExpense : myStyles.listDescriptIncome}>  {item.descript}</Text> 
          <Text style={item.amount < 0? myStyles.listExpenseAmount : myStyles.listIncomeAmount}>${item.amount.toFixed(2)}</Text>
        
        </View>
        }
      />
      </View>
    </View>

    
  );
}
}


const myStyles = StyleSheet.create({
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 150,
    margin: 10,
    borderRadius: 10,
  },

  buttonStyle: {
    color:'white',
    fontWeight:'bold',
    textAlign:'center',

  },
    
  buttonWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  buttonStyle1: {
    zIndex: 1,
    borderRadius: 10, 
    backgroundColor:'#007ae6', 
    height: 55, 
    width:'36%', 
    padding:7, 
    justifyContent:'center',
  },

  headerExpense: {
    flex: 1,
    margin: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    backgroundColor: '#FFFFFF33',
    borderWidth: 2,
    shadowColor: "#FFF",
    shadowOffset: {
	  width: 2,
	  height: 4,
    },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  borderRadius: 10,
  },


  headerIncome: {
    flex: 1,
    margin: 10,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#32c24d',
    backgroundColor: '#FFFFFF33',
    borderWidth: 2,
    shadowColor: "#FFF",
    shadowOffset: {
	  width: 2,
	  height: 4,
    },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  borderRadius: 10,
  },

 inputStyle: {
    fontFamily: 'helvetica',
    fontSize: 20,
    flex: 1,
    flexDirection:'row',
  },

  headerBalance: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    margin: 10,
    borderColor: 'yellow',
    borderWidth: 2,
    backgroundColor: '#FFFFFF33',
    shadowColor: "#AAA",
    shadowOffset: {
	  width: 2,
    height: 4,
    },

  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  borderRadius: 10,
  },


  incomeInput: {
    borderColor: 'black',
    fontSize: 20,
    margin: 10,
    height: 55,
    flex: 1,
    flexDirection:'row',
    paddingLeft: 5,
    backgroundColor: 'white',
  },
  ModalText: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 20,
  },
  ModalWrap: {
    flex: 1, 
    flexDirection: 'row', 
    height: '65%', 
    margin: 'auto', 
    marginTop: 0, 
    backgroundColor: '#dbdbdb', 
    padding: 20, 
    flexDirection: 'row', 
    height: 70, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  ModalStyle1: {
    flex: 1, 
    flexDirection: 'row', 
    height: '65%', 
    margin: 'auto', 
    // marginBottom:0, 
    backgroundColor: '#dbdbdb', 
    padding: 20, 
    flexDirection: 'row', 
    height: 70, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  ModalStyle2: {
    margin: 40, 
    borderColor: 'black', 
    borderRadius: 15, 
    // backgroundColor: 'red', 
    alignItems: 'center', 
    justifyContent:'center',
    flex: 1,
  },
  incomeText: {
    fontFamily: 'Consolas', 
    color: '#32c24d', 
    fontWeight: '800', 
    fontSize: 20,
  },
  expenseText: {
    fontFamily: 'Consolas', 
    color: '#ff3333', 
    fontWeight: '800', 
    fontSize: 20,
  },
  balanceText: {
    fontFamily: 'Consolas', 
    color: '#e3de59', 
    fontWeight: '800', 
    fontSize: 25,
  },
  listStyleExpense: {
    backgroundColor: '#FFFFFF33',
    margin: 7, 
    flex: 1,
    height: 60,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 2,
    shadowColor: "#FFF",
    shadowOffset: {
	  width: 2,
	  height: 4,
    },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  },
  listStyleIncome: {
    backgroundColor: '#FFFFFF33',
    margin: 7, 
    flex: 1,
    flexDirection: 'row',
    borderColor: '#32c24d',
    borderWidth: 2,
    height: 60,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#FFF",
    shadowOffset: {
	  width: 2,
	  height: 4,
    },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  },
  listIncomeAmount: {
    flex: 2, 
    textAlign: 'center', 
    fontFamily:'Consolas', 
    fontSize:17, 
    color:'#3ae059',
  },
  listExpenseAmount: {
    flex: 4, 
    textAlign: 'center', 
    fontFamily:'Consolas', 
    fontSize:17, 
    color:'#ff504a',
  },
  listDescriptExpense: {
      flex: 6, 
      fontFamily:'Consolas', 
      fontSize:17, 
      color:'#ff504a',
  },
  listDescriptIncome: {
    flex: 6, 
    fontFamily:'Consolas', 
    fontSize:17, 
    color:'#3ae059',
},
listDel: {
  flex:1, 
  color: 'white', 
  fontSize:18, 
  fontWeight:'bold', 
  textAlign:'center', 
  backgroundColor:'red', 
  borderRadius:20,
}
});

export default App;
