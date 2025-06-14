import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';

export default function EditPatient() {
  const router = useRouter();
  const { id } = router.query;

  const [patient, setPatient] = useState({
    name: '',
    species: '',
    weight: '',
    diagnosis: '',
    treatment: '',
  });

  useEffect(() => {
    if (id) {
      supabase.from('patients').select('*').eq('id', id).single().then(({ data, error }) => {
        if (!error && data) setPatient(data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    await supabase.from('patients').update(patient).eq('id', id);
    router.push('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Редактировать пациента</h1>
      <Card>
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input name="name" placeholder="Кличка" value={patient.name} onChange={handleChange} />
            <Input name="species" placeholder="Вид (кошка, собака...)" value={patient.species} onChange={handleChange} />
            <Input name="weight" placeholder="Вес (кг)" value={patient.weight} onChange={handleChange} />
            <Input name="diagnosis" placeholder="Диагноз" value={patient.diagnosis} onChange={handleChange} />
            <Input name="treatment" placeholder="Назначения" value={patient.treatment} onChange={handleChange} />
          </div>
          <Button onClick={saveChanges}>Сохранить изменения</Button>
        </CardContent>
      </Card>
    </div>
  );
}
