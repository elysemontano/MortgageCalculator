import React, { useEffect } from 'react';
import { Button, TextInput, SafeAreaView, View, StyleSheet, Text } from 'react-native';

import colors from '../config/colors';

function calculator(props) {
        const [loan, setLoan] = React.useState('');
        const [loanAmount, setLoanAmount] = React.useState('');
        const [interest, setInterest] = React.useState('');
        const [interestAmount, setInterestAmount] = React.useState('');
        const [term, setTerm] = React.useState('');
        const [termLength, setTermLength] = React.useState('');
        const [monthly, setMonthly] = React.useState('');
        
        const onSubmit = () => {
            handleLoan(loan)
            handleInterest(interest)
            handleTerm(term)
        }

        const handleLoan = () => {
            setLoanAmount(+loan.replace(/\D/g,''))
        }

        const handleInterest = () => {
            setInterestAmount(+interest.replace(/[^.0-9]/g, ''))
        }

        const handleTerm = () => {
            setTermLength(+term.replace(/\D/g,''))
        }
        
        const calculate = () => {
            let monthlyInterest = interestAmount / 100 / 12
            let monthlyLoan = termLength * 12
            let x = Math.pow(1 + monthlyInterest, monthlyLoan);
            let monthlyPayment = +Math.trunc((loanAmount*x*monthlyInterest)/(x-1))
            setMonthly(monthlyPayment)
        }

        useEffect(() => {
            calculate(loanAmount, interestAmount, termLength)
        }, [onSubmit])

        return (
           <SafeAreaView style={styles.container}>
               <View style={styles.header}>
               <Text style={styles.headerText}>Mortgage Calculator</Text>
               </View>
    
               <View style={styles.inputContainer}>
                   <Text style={styles.text}>Loan Amount:</Text>
                   <TextInput 
                        style={styles.input}
                        onChangeText={loan => setLoan(loan)}
                        defaltValue={loan}
                        placeholder="$400,000"/>
    
                   <Text style={styles.text}>Interest Rate:</Text>
                   <TextInput 
                        style={styles.input}
                        onChangeText={interest => setInterest(interest)}
                        defaultValue={interest}
                        placeholder="3.5%"/>
    
                   <Text style={styles.text}>Loan Term:</Text>
                   <TextInput 
                        style={styles.input}
                        onChangeText={term => setTerm(term)}
                        defaultValue={term}
                        placeholder="30 year"/>

                    <View style={styles.button}>
                    <Button
                        title="Calculate"
                        color="#000"
                        onPress={onSubmit}/>
                    </View>
                    <View style={styles.result}>
                        {!isNaN(monthly) &&
                        <Text style={styles.result}>${monthly} per month</Text>}
                        
                    </View>
           </View>
           </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.pink,
        color: colors.white,
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
        marginBottom: 10,
        width: '30%',
        height: '8%',
        borderRadius: 25,
        borderWidth: .5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        flex: 1,
      backgroundColor: colors.black,
      alignItems: 'center',
    },
    header: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '15%',
        backgroundColor: colors.secondary,
        borderWidth: .5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    headerText: {
        fontSize: 30,
    },
    inputContainer: {
        flex: 3,
        paddingTop: 50,
        width: '100%',
        backgroundColor: colors.primary,
    },
    input: {
        backgroundColor: colors.white,
        height: 45,
        width: '70%',
        margin: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: .5,
        borderRadius: 10,
        paddingLeft: 10,
      },
    result: {
        flex: 1,
        fontSize: 30,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
      text: {
          marginLeft: 60,
      },
  });

export default calculator;