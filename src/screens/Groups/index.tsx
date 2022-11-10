import { useState, useCallback } from "react"
import { FlatList, Alert } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native"

import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { GroupCard } from "@components/GroupCard"
import { ListEmpty } from "@components/ListEmpty"
import { Button } from "@components/Button"
import { Loading } from "@components/Loading"

import { groupsGetAll } from "@storage/group/groupsGetAll"

import { Container } from "./styles"

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const { navigate } = useNavigation()

  function handleAddNewGroup() {
    navigate("new")
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const groups = await groupsGetAll()
      setGroups(groups)
    } catch (error) {
      Alert.alert("Turmas", "Não foi possível carregas as turmas")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigate("players", { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, [])
  )

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={!groups.length && { flex: 1 }}
          ListEmptyComponent={
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          }
        />
      )}

      <Button title="Criar nova turma" onPress={handleAddNewGroup} />
    </Container>
  )
}
