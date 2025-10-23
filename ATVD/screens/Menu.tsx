import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./Home";
import Lista from "./Listar"
import { Usuario } from "../model/Usuario";

const Drawer = createDrawerNavigator();

export default function Menu(){

    return(
            <Drawer.Navigator initialRouteName="Página Inicial" >
                <Drawer.Screen name="Página Inicial" component={Home} />
                <Drawer.Screen name="Listar " component={Lista}/>
                <Drawer.Screen name="Cadastro de Usuário " component={Usuario}/>
            </Drawer.Navigator>
    )
}