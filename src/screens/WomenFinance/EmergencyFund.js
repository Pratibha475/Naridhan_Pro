
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Button from '../../components/Button';

const EmergencyFund = ({ language = 'en' }) => {
  const [targetAmount, setTargetAmount] = useState('50000');
  const [currentAmount, setCurrentAmount] = useState('25000');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');

  const isHindi = language === 'hi';

  const calculateProgress = () => {
    const target = parseFloat(targetAmount) || 1;
    const current = parseFloat(currentAmount) || 0;
    return Math.min((current / target) * 100, 100);
  };

  const progress = calculateProgress();

  const handleAddFund = () => {
    const amount = parseFloat(addAmount);
    if (!amount || amount <= 0) {
      Alert.alert(isHindi ? 'त्रुटि' : 'Error', isHindi ? 'कृपया सही राशि दर्ज करें' : 'Please enter a valid amount');
      return;
    }

    const newCurrent = (parseFloat(currentAmount) || 0) + amount;
    setCurrentAmount(newCurrent.toString());
    setAddAmount('');
    setShowAddModal(false);

    Alert.alert(
      isHindi ? 'सफल' : 'Success',
      isHindi ? '₹' + amount + ' आपातकालीन फंड में जोड़ा गया' : '₹' + amount + ' added to emergency fund'
    );
  };

  const emergencyContacts = [
    { name: isHindi ? 'महिला हेल्पलाइन' : 'Women Helpline', number: '1091', icon: 'call' },
    { name: isHindi ? 'पुलिस' : 'Police', number: '100', icon: 'shield' },
    { name: isHindi ? 'एम्बुलेंस' : 'Ambulance', number: '102', icon: 'medical' },
    { name: isHindi ? 'आपदा प्रबंधन' : 'Disaster Management', number: '108', icon: 'warning' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Emergency Fund Tracker */}
      <Card style={styles.fundCard}>
        <Text style={styles.cardTitle}>
          {isHindi ? 'आपातकालीन फंड ट्रैकर' : 'Emergency Fund Tracker'}
        </Text>

        <View style={styles.fundHeader}>
          <Text style={styles.fundLabel}>
            {isHindi ? 'लक्ष्य' : 'Target'}: ₹{parseFloat(targetAmount).toLocaleString()}
          </Text>
          <Text style={styles.fundValue}>
            ₹{parseFloat(currentAmount).toLocaleString()} / ₹{parseFloat(targetAmount).toLocaleString()}
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.progressText}>
          {progress.toFixed(1)}% {isHindi ? 'पूरा हुआ' : 'Complete'}
        </Text>

        <View style={styles.fundActions}>
          <Button
            title={isHindi ? 'फंड जोड़ें' : 'Add to Fund'}
            onPress={() => setShowAddModal(true)}
            style={styles.fundButton}
          />
          <Button
            title={isHindi ? 'लक्ष्य बदलें' : 'Change Target'}
            onPress={() => {
              Alert.prompt(
                isHindi ? 'लक्ष्य बदलें' : 'Change Target',
                isHindi ? 'नया लक्ष्य राशि दर्ज करें' : 'Enter new target amount',
                (text) => {
                  if (text && !isNaN(parseFloat(text))) {
                    setTargetAmount(text);
                  }
                },
                'plain-text',
                targetAmount
              );
            }}
            style={[styles.fundButton, styles.targetButton]}
          />
        </View>
      </Card>

      {/* Emergency Contacts */}
      <Text style={styles.sectionTitle}>
        {isHindi ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
      </Text>

      {emergencyContacts.map((contact, index) => (
        <TouchableOpacity key={index} style={styles.contactCard}>
          <View style={styles.contactLeft}>
            <View style={styles.contactIcon}>
              <Ionicons name={contact.icon} size={24} color="#F44336" />
            </View>
            <View>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactNumber}>{contact.number}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      {/* Safety Tips */}
      <Card style={styles.tipsCard}>
        <Text style={styles.cardTitle}>
          {isHindi ? 'सुरक्षा टिप्स' : 'Safety Tips'}
        </Text>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            {isHindi ? 'हमेशा अपने फोन को चार्ज रखें' : 'Always keep your phone charged'}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            {isHindi ? 'आपातकालीन नंबर अपने पास रखें' : 'Save emergency numbers in your phone'}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            {isHindi ? 'अकेले यात्रा करते समय सतर्क रहें' : 'Stay alert when traveling alone'}
          </Text>
        </View>
      </Card>

      {/* Add Fund Modal */}
      {showAddModal && (
        <View style={styles.modalOverlay}>
          <Card style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isHindi ? 'फंड में जोड़ें' : 'Add to Fund'}
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder={isHindi ? 'राशि दर्ज करें' : 'Enter amount'}
              keyboardType="numeric"
              value={addAmount}
              onChangeText={setAddAmount}
            />

            <View style={styles.modalActions}>
              <Button
                title={isHindi ? 'रद्द करें' : 'Cancel'}
                onPress={() => setShowAddModal(false)}
                style={[styles.modalButton, styles.cancelButton]}
              />
              <Button
                title={isHindi ? 'जोड़ें' : 'Add'}
                onPress={handleAddFund}
                style={styles.modalButton}
              />
            </View>
          </Card>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fundCard: {
    margin: 15,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 15,
  },
  fundHeader: {
    marginBottom: 10,
  },
  fundLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5,
  },
  fundValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6B4EFF',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'right',
  },
  fundActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  fundButton: {
    flex: 1,
  },
  targetButton: {
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  contactIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  contactNumber: {
    fontSize: 14,
    color: '#F44336',
    marginTop: 2,
  },
  callButton: {
    padding: 10,
  },
  tipsCard: {
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
    padding: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#757575',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
});

export default EmergencyFund;