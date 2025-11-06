import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./Home";
import CadastroDep from "./Dependente";
import ListarDep from "./ListarDep";
import CardM from "./Card";
import ListarCard from "./ListarCard";

const Drawer = createDrawerNavigator();

export default function Menu(){

    return(
            <Drawer.Navigator initialRouteName="Página Inicial" >
                <Drawer.Screen name="Página Inicial" component={Home} />
                <Drawer.Screen name="Listar Dependentes " component={ListarDep}/>
                <Drawer.Screen name="Cadastro de Dependentes" component={CadastroDep}/>
                <Drawer.Screen name="Listar Cartão " component={ListarCard}/>
                <Drawer.Screen name="Cadastro de Cartão" component={CardM}/>
            </Drawer.Navigator>
    )
}