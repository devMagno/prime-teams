import { useNavigation } from "@react-navigation/native"

import logoImg from "@assets/logo.png"

import { Container, Logo, BackButton, BackIcon } from "./style"

interface HeaderProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  const { navigate } = useNavigation()

  function handleGoBack() {
    navigate("groups")
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}
