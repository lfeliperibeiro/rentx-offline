import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Calendar as CustomCalendar,
  DateCallbackHandler,
  LocaleConfig,
} from "react-native-calendars";
import { useTheme } from "styled-components";
import { ptBr } from "./localeConfig";
import { generateInterval } from "./generateInterval";

LocaleConfig.locales["pt-br"] = ptBr;
LocaleConfig.defaultLocale = "pt-br";

interface MarketDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface CaledarProps {
  markedDates: MarketDateProps;
  onDayPress: DateCallbackHandler;
}

function Calendar({ markedDates, onDayPress }: CaledarProps) {
  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction === "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_details,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        textDayHeaderFontSize: 10,
        arrowStyle: { marginHorizontal: -15 },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType={"period"}
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { Calendar, MarketDateProps, DayProps, generateInterval };
