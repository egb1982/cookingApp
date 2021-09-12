import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal,TextInput, Headline } from 'react-native-paper';

type ListNameModalProps = {
    id:string,
    name:string,
    visible:boolean,
    hideModal:()=>void,
    onChangeName:(newName:string)=>void,
    onAccept:()=>void,
}

export const ListNameModal = ({id,name,visible,hideModal,onChangeName,onAccept}:ListNameModalProps):JSX.Element => {
    return (
        <Modal 
            visible={visible} 
            onDismiss={hideModal} 
            contentContainerStyle={styles.modal}
            >
            { id !== '' ? 
                <Headline>Cambiar nombre</Headline>
                :<Headline>Nombre de la lista</Headline>
            }
            <TextInput 
                value={name} 
                onChangeText={onChangeName}
                placeholder='Escribe un nombre para la lista'/>
            <View style={styles.modalButtons}>
                <Button onPress={hideModal}>Cancelar</Button>
                <Button mode="contained" onPress={onAccept}>Aceptar</Button>
            </View>    
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {backgroundColor: 'white', padding: 20, height:200},
    modalButtons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
    }
})