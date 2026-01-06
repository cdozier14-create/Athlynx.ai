import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'athlete' | 'brand' | 'coach'>('athlete');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>ATHLYNX</Text>
        <Text style={styles.tagline}>THE ATHLETE'S PLAYBOOK</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Join ATHLYNX</Text>
        <Text style={styles.subtitle}>Start your journey to success</Text>

        <Text style={styles.label}>I am a...</Text>
        <View style={styles.typeRow}>
          {(['athlete', 'brand', 'coach'] as const).map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.typeBtn, userType === type && styles.typeBtnActive]}
              onPress={() => setUserType(type)}
            >
              <Text style={styles.typeIcon}>{type === 'athlete' ? '🏈' : type === 'brand' ? '🏢' : '📋'}</Text>
              <Text style={[styles.typeText, userType === type && styles.typeTextActive]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#64748b"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#64748b"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#64748b"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.signupBtnText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Text>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialBtn}>
          <Text style={styles.socialIcon}>G</Text>
          <Text style={styles.socialText}>Sign up with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.dhg}>A Dozier Holdings Group Company</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { alignItems: 'center', paddingTop: 50, paddingBottom: 20 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#22d3ee', letterSpacing: 4 },
  tagline: { fontSize: 11, color: '#94a3b8', letterSpacing: 2, marginTop: 4 },
  form: { paddingHorizontal: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#64748b', marginBottom: 20 },
  label: { color: '#94a3b8', fontSize: 14, marginBottom: 8 },
  typeRow: { flexDirection: 'row', marginBottom: 20 },
  typeBtn: { flex: 1, backgroundColor: '#1e293b', borderRadius: 12, padding: 12, alignItems: 'center', marginHorizontal: 4 },
  typeBtnActive: { backgroundColor: '#22d3ee' },
  typeIcon: { fontSize: 24, marginBottom: 4 },
  typeText: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  typeTextActive: { color: '#0f172a' },
  input: { backgroundColor: '#1e293b', borderRadius: 12, padding: 16, color: '#fff', fontSize: 16, marginBottom: 12 },
  signupBtn: { backgroundColor: '#22d3ee', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  signupBtnText: { color: '#0f172a', fontSize: 16, fontWeight: 'bold' },
  terms: { color: '#64748b', fontSize: 11, textAlign: 'center', marginTop: 16, lineHeight: 16 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#334155' },
  dividerText: { color: '#64748b', paddingHorizontal: 16, fontSize: 12 },
  socialBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', borderRadius: 12, padding: 14 },
  socialIcon: { fontSize: 20, marginRight: 12 },
  socialText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: '#64748b', fontSize: 14 },
  loginLink: { color: '#22d3ee', fontSize: 14, fontWeight: 'bold', marginLeft: 4 },
  dhg: { textAlign: 'center', color: '#475569', fontSize: 11, marginTop: 20, marginBottom: 24 },
});
