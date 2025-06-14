import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { supabase } from '../lib';

export default function Home() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    species: '',
    weight: '',
    diagnosis: '',
    treatment: '',
  });

  const handleChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const fetchPatients = async () => {
    const { data, error } = await supabase.from('patients').select('*').order('id', { ascending: false });
    if (!error) setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const addPatient = async () => {
    const { error } = await supabase.from('patients').insert([newPatient]);
    if (!error) {
      setNewPatient({ name: '', species: '', weight: '', diagnosis: '', treatment: '' });
      fetchPatients();
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Vet’n’Roll — Учёт пациентов</h1>
      <Card>
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input name="name" placeholder="Кличка" value={newPatient.name} onChange={handleChange} />
            <Input name="species" placeholder="Вид (кошка, собака...)" value={newPatient.species} onChange={handleChange} />
            <Input name="weight" placeholder="Вес (кг)" value={newPatient.weight} onChange={handleChange} />
            <Input name="diagnosis" placeholder="Диагноз" value={newPatient.diagnosis} onChange={handleChange} />
            <Input name="treatment" placeholder="Назначения" value={newPatient.treatment} onChange={handleChange} />
          </div>
          <Button onClick={addPatient}>Добавить пациента</Button>
        </CardContent>
      </Card>

      <div style={{ marginTop: '2rem' }}>
        {patients.map((p) => (
          <Card key={p.id}>
            <CardContent>
              <p><strong>Кличка:</strong> {p.name}</p>
              <p><strong>Вид:</strong> {p.species}</p>
              <p><strong>Вес:</strong> {p.weight} кг</p>
              <p><strong>Диагноз:</strong> {p.diagnosis}</p>
              <p><strong>Назначения:</strong> {p.treatment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
