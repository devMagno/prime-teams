import { TouchableOpacityProps } from "react-native"
import { Container, Title, FilterStyleProps } from "./styles"

interface FilterProps extends FilterStyleProps, TouchableOpacityProps {
  title: string
}

export function Filter({ title, isActive = false, ...rest }: FilterProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
