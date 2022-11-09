import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"

import { Container, Content, Icon } from "./styles"

export function NewGroup() {
  const [group, setGroup] = useState("")
  const { navigate } = useNavigation()

  function handleCreateNewGroup() {
    navigate("players", { group })
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar seus membros"
        />

        <Input
          placeholder="Nome da turma"
          value={group}
          onChangeText={setGroup}
        />

        <Button
          onPress={handleCreateNewGroup}
          title="Criar"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  )
}
