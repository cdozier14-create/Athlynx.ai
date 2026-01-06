import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const POSITIONS = ['All', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S'];
const SAMPLE_PLAYERS = [
  { id: 1, name: 'Marcus Johnson', position: 'QB', school: 'Texas A&M', stars: 4, nilValue: '$125K' },
  { id: 2, name: 'DeShawn Williams', position: 'RB', school: 'Georgia', stars: 5, nilValue: '$280K' },
  { id: 3, name: 'Tyler Smith', position: 'WR', school: 'Ohio State', stars: 4, nilValue: '$95K' },
  { id: 4, name: 'Jordan Davis', position: 'DL', school: 'Alabama', stars: 5, nilValue: '$320K' },
  { id: 5, name: 'Chris Thompson', position: 'LB', school: 'LSU', stars: 4, nilValue: '$150K' },
];

export default function TransferPortalScreen() {
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('All');

  const filteredPlayers = SAMPLE_PLAYERS.filter(p => 
    (position === 'All' || p.position === position) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.deadPeriod}>
          <View style={styles.liveDot} />
          <Text style={styles.deadPeriodText}>CONTACT PERIOD OPEN</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search players..."
          placeholderTextColor="#64748b"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.positionFilter}>
        {POSITIONS.map(pos => (
          <TouchableOpacity
            key={pos}
            style={[styles.positionBtn, position === pos && styles.positionBtnActive]}
            onPress={() => setPosition(pos)}
          >
            <Text style={[styles.positionText, position === pos && styles.positionTextActive]}>{pos}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredPlayers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.playerCard}>
            <View style={styles.playerAvatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{item.name}</Text>
              <Text style={styles.playerSchool}>{item.school} • {item.position}</Text>
              <View style={styles.starsRow}>
                {[...Array(item.stars)].map((_, i) => (
                  <Text key={i} style={styles.star}>⭐</Text>
                ))}
              </View>
            </View>
            <View style={styles.nilBadge}>
              <Text style={styles.nilValue}>{item.nilValue}</Text>
              <Text style={styles.nilLabel}>NIL Value</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.playerList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 16, backgroundColor: '#1e293b' },
  deadPeriod: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e', marginRight: 8 },
  deadPeriodText: { color: '#22c55e', fontSize: 12, fontWeight: 'bold' },
  searchInput: { backgroundColor: '#0f172a', borderRadius: 12, padding: 12, color: '#fff', fontSize: 16 },
  positionFilter: { padding: 12 },
  positionBtn: { paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderRadius: 20, backgroundColor: '#1e293b' },
  positionBtnActive: { backgroundColor: '#22d3ee' },
  positionText: { color: '#94a3b8', fontWeight: '600' },
  positionTextActive: { color: '#0f172a' },
  playerList: { padding: 16 },
  playerCard: { flexDirection: 'row', backgroundColor: '#1e293b', borderRadius: 16, padding: 16, marginBottom: 12, alignItems: 'center' },
  playerAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#22d3ee', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  playerInfo: { flex: 1, marginLeft: 12 },
  playerName: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  playerSchool: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  starsRow: { flexDirection: 'row', marginTop: 4 },
  star: { fontSize: 12 },
  nilBadge: { alignItems: 'flex-end' },
  nilValue: { fontSize: 16, fontWeight: 'bold', color: '#22d3ee' },
  nilLabel: { fontSize: 10, color: '#64748b' },
});
