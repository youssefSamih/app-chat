import { View, StyleSheet } from "react-native";
import SelectList from "react-native-dropdown-select-list";
import DownArrow from "../assets/images/downward-arrow.svg";
import Language from "../assets/images/language.svg";
import { SvgUri } from "react-native-svg";

const SelectLanguage = ({
  selected,
  setSelected,
  setIndex,
  pressed,
  index,
  setLanguage,
  data,
  flags,
}) => {
  return (
    <>
      <SelectList
        setSelected={setIndex}
        data={data}
        search={false}
        placeholder={"Select your language"}
        boxStyles={{
          width: 319,
          height: 51,
          paddingLeft: 50,
          borderColor: !selected && pressed ? "red" : "black",
          borderWidth: 1,
          borderRadius: 15,
        }}
        arrowicon={<DownArrow marginTop={5} marginLeft={25} />}
        onSelect={() => {
          setSelected(true);
          setLanguage(data[index].value);
        }}
      />
      <View style={styles.emote}>
        <Language width={30} height={30} />
      </View>
      {selected && (
        <View style={styles.flags}>
          <SvgUri width={31} height={19} uri={index && flags[index].urls[0]} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emote: {
    width: 30,
    height: 30,
    position: "absolute",
    left: 10,
    top: 10,
  },
  flags: {
    width: 31,
    height: 19,
    position: "absolute",
    left: 223,
    top: 16,
  },
});
export default SelectLanguage;
