import { TextInput } from "react-native"
import styled, { css } from "styled-components/native"

export const Container = styled(TextInput)`
  flex: 1;
  min-height: 56px;
  max-height: 56px;

  padding: 16px;
  border-radius: 6px;

  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    background-color: ${theme.COLORS.GRAY_700};
  `}
`
