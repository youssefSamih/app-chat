
import { View, StyleSheet, Text } from 'react-native';
import { TimePicker } from 'react-native-simple-time-picker';

import ClockIcon from "../assets/images/clock.svg";

const $ = StyleSheet.create({
    container: {
        position: "relative",
        height: 40,
    },
    btnContainer: {
        position: "relative",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "#fff",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        overflow: 'hidden',
    },
    title: {
        backgroundColor: '#fff',
        fontSize: 12,
        textAlign: "center",
        position: "absolute",
        zIndex: 1,
        left: 50,
        top: -10
    },
    icon: {
        margin: 3,
        marginLeft: 10,
        marginRight: 10
    },
    result: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    },
    calendar: {
        position: "absolute",
    }
});

const TimePickerComponent = ({ width, title, state, setState, style }) => {

    if (!style) style = {};

    return <View style={[$.container, { width: width, zIndex: 400 }, style]}>
        <Text style={[$.title, { width: (title.length * $.title.fontSize * 0.8) }]}>{title}</Text>

        <View style={$.btnContainer} >
            <ClockIcon style={$.icon} width={30} height={30} />
            <TimePicker value={state} onChange={(val) => { setState(val); }} hoursUnit=" h" zeroPadding={true} />
        </View>
    </View>;
};

export default TimePickerComponent;
