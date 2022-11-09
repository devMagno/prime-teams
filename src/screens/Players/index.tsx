import { useState } from "react"
import { FlatList } from "react-native"
import { useRoute } from "@react-navigation/native"

import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Input } from "@components/Input"
import { ButtonIcon } from "@components/ButtonIcon"
import { Filter } from "@components/Filter"
import { PlayerCard } from "@components/PlayerCard"
import { ListEmpty } from "@components/ListEmpty"
import { Button } from "@components/Button"

import { Container, Form, ListHeader, PlayersCount } from "./styles"

type RouteParams = {
  group: string
}

export function Players() {
  const [selectedTeam, setSelectedTeam] = useState("Time A")
  const [players, setPlayers] = useState([
    "Fulano",
    "Ciclano",
    "Beltrano",
    "Sicrano",
    "Maria",
    "João",
    "Carlos",
  ])

  const route = useRoute()
  const { group } = route.params as RouteParams

  function handlePlayerRemove(player: string) {
    setPlayers((prevState) => prevState.filter((item) => item !== player))
  }

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times!"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={handlePlayerRemove} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
      />

      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  )
}
