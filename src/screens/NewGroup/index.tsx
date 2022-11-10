import { useState } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Button } from "@components/Button"
import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"

import { groupCreate } from "@storage/group/groupCreate"

import { AppError } from "@utils/AppError"

import { Container, Content, Icon } from "./styles"

export function NewGroup() {
  const [group, setGroup] = useState("")
  const { navigate } = useNavigation()

  async function handleCreateNewGroup() {
    if (!group.trim())
      return Alert.alert("Nova Turma", "Informe o nome da turma.")

    try {
      await groupCreate(group)
      navigate("players", { group })
    } catch (error) {
      if (error instanceof AppError) Alert.alert("Nova Turma", error.message)
      else {
        Alert.alert("Nova Turma", "Erro ao criar a turma.")
        console.log(error)
      }
    }
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
