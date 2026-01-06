import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>CD</Text>
        </View>
        <Text style={styles.name}>Chad Dozier</Text>
        <Text style={styles.role}>Founder & CEO</Text>
        <View style={styles.nilBadge}>
          <Text style={styles.nilValue}>$2.5M</Text>
          <Text style={styles.nilLabel}>Estimated NIL Value</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>👥</Text>
          <Text style={styles.statNum}>125K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📈</Text>
          <Text style={styles.statNum}>8.5%</Text>
          <Text style={styles.statLabel}>Engagement</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>💼</Text>
          <Text style={styles.statNum}>12</Text>
          <Text style={styles.statLabel}>NIL Deals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>⭐</Text>
          <Text style={styles.statNum}>5.0</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionIcon}>✏️</Text>
        <Text style={styles.actionText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionIcon}>🔗</Text>
        <Text style={styles.actionText}>Connect Social Media</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionIcon}>📊</Text>
        <Text style={styles.actionText}>View Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionIcon}>💰</Text>
        <Text style={styles.actionText}>NIL Calculator</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBtn, styles.logoutBtn]}>
        <Text style={styles.actionIcon}>🚪</Text>
        <Text style={[styles.actionText, styles.logoutText]}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { alignItems: 'center', paddingVertical: 30, backgroundColor: '#1e293b' },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#22d3ee', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#0f172a' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 12 },
  role: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  nilBadge: { marginTop: 16, backgroundColor: '#0f172a', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 16 },
  nilValue: { fontSize: 28, fontWeight: 'bold', color: '#22d3ee', textAlign: 'center' },
  nilLabel: { fontSize: 12, color: '#64748b', textAlign: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
  statCard: { width: '46%', backgroundColor: '#1e293b', borderRadius: 16, padding: 16, margin: '2%', alignItems: 'center' },
  statIcon: { fontSize: 24, marginBottom: 8 },
  statNum: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', padding: 20, paddingBottom: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', marginHorizontal: 20, marginBottom: 10, padding: 16, borderRadius: 12 },
  actionIcon: { fontSize: 20, marginRight: 12 },
  actionText: { fontSize: 16, color: '#fff' },
  logoutBtn: { backgroundColor: '#7f1d1d' },
  logoutText: { color: '#fca5a5' },
});
