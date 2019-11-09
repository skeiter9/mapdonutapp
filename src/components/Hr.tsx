import React from 'react';
import { View } from "react-native";

export default function(props: { mb: number }) {
    return <View style={{ marginBottom: props.mb }} />
}
