import { ButtonIcon } from "@components/ButtonIcon"

import { Container, Icon, Name } from "./styles"

interface PlayerCardProps {
  name: string
  onRemove: (player: string) => void
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />

      <Name>{name}</Name>

      <ButtonIcon
        icon="close"
        type="SECONDARY"
        onPress={() => onRemove(name)}
      />
    </Container>
  )
}
