import { useState, useEffect, useRef } from "react"
import { FlatList, Alert, TextInput } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"
import { ButtonIcon } from "@components/ButtonIcon"
import { Filter } from "@components/Filter"
import { PlayerCard } from "@components/PlayerCard"
import { ListEmpty } from "@components/ListEmpty"
import { Button } from "@components/Button"
import { Loading } from "@components/Loading"

import { AppError } from "@utils/AppError"

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO"
import { playerAddByGroup } from "@storage/player/playerAddByGroup"
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam"
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup"
import { groupRemoveByName } from "@storage/group/groupRemoveByName"

import { Container, Form, ListHeader, PlayersCount } from "./styles"

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTeam, setSelectedTeam] = useState("Time A")
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState("")
  const newPlayerNameInputRef = useRef<TextInput>(null)

  const route = useRoute()
  const { navigate } = useNavigation()

  const { group } = route.params as RouteParams

  async function removeGroup() {
    try {
      setIsLoading(true)

      await groupRemoveByName(group)
      navigate("groups")
    } catch (error) {
      Alert.alert("Remover turma", "Houve um erro ao remover a turma.")

      console.log(error)
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover turma", "Tem certeza que deseja remover a turma?", [
      {
        text: "Sim",
        style: "default",
        onPress: () => removeGroup(),
      },
      {
        text: "N??o",
        style: "cancel",
      },
    ])
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert("Remover jogador(a)", "N??o foi poss??vel remover essa pessoa.")

      console.log(error)
    }
  }

  async function handleAddPlayer() {
    if (!newPlayerName.trim())
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar ao time."
      )

    const newPlayer = {
      name: newPlayerName.trim(),
      team: selectedTeam,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName("")
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) Alert.alert("Nova pessoa", error.message)
      else
        Alert.alert(
          "Nova pessoa",
          "N??o foi poss??vel adicionar a pessoa, tente novamente mais tarde."
        )

      console.log(error)
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, selectedTeam)

      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert(
        "Pessoas",
        "N??o foi poss??vel carregar as pessoas do time selecionado."
      )

      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [selectedTeam])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times!"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <ListHeader>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={selectedTeam === item}
              onPress={() => setSelectedTeam(item)}
            />
          )}
          horizontal
        />

        <PlayersCount>{players.length}</PlayersCount>
      </ListHeader>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard name={item.name} onRemove={handlePlayerRemove} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
          ListEmptyComponent={() => (
            <ListEmpty message="N??o h?? pessoas nesse time." />
          )}
        />
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
