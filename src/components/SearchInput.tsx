import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebounceValue} from '../hooks/useDebounceValue';

interface Props {
  style?: StyleProp<ViewStyle>;
  onDebounce: (value: string) => void;
}

export const SearchInput = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');

  const debouncedValue = useDebounceValue(textValue, 1500);

  useEffect(() => {
    // console.log(debouncedValue);
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={{...localStyle.container, ...(style as any)}}>
      <View style={localStyle.textBackground}>
        <TextInput
          style={localStyle.textInput}
          placeholder="Buscar Pokemon"
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <TouchableOpacity onPress={() => console.log('yaaa')}>
          <Icon name="search-outline" size={18} color={'#7f7f7f'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  textBackground: {
    backgroundColor: '#e8e8e8',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
});
