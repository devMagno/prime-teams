import { SafeAreaView } from "react-native-safe-area-context"
import styled, { css } from "styled-components/native"

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const Form = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const ListHeader = styled.View`
  width: 100%;
  margin: 32px 0 12px;
  flex-direction: row;
  align-items: center;
`

export const PlayersCount = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`
