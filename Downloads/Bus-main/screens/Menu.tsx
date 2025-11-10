import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./Home";
import Motorista from "./Motorista";
import MLista from "./MListar"
import  Card  from "./Card";
import ListarCard from "./ListarCard";

const Drawer = createDrawerNavigator();

export default function Menu(){

    return(
            <Drawer.Navigator initialRouteName="Página Inicial" >
                <Drawer.Screen name="Página Inicial" component={Home} />
                <Drawer.Screen name="Motorista" component={Motorista}/>
                <Drawer.Screen name="Listar Motoristas" component={MLista}/>
                <Drawer.Screen name="Card" component={Card}/>
                <Drawer.Screen name="Listar Cartões" component={ListarCard}/>
            </Drawer.Navigator>
    )
}