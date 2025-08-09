import React, { useCallback, useState } from 'react';
import { useStaffStore } from '../../store/reservation.store.staff';
import { useNailStore } from '../../store/reservation.store.nail';
import { useReservation } from '../../hooks/reservation.hook.reservation';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';

const AddReservation: React.FC = () => {
  const staffs = useStaffStore((state) => state.staffs);
  const nails = useNailStore((state) => state.nails);
  const { createReservation } = useReservation();
  const setModalType = useModalStore((state) => state.setModalType);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [staffId, setStaffId] = useState('');
  const [nailId, setNailId] = useState('');

  const handleReset = useCallback(() => {
    setName('');
    setPhone('');
    setDate('');
    setStaffId('');
    setNailId('');
  }, []);
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, phone, date, staffId, nailId);

    await createReservation({
      name,
      phone,
      date,
      staffId,
      nailId,
    });
    handleReset();
    setModalType(ModalType.None);
  }, [createReservation, name, phone, date, staffId, nailId, handleReset, setModalType]);

  return (
    <div>
      <h2>Add Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={staffId} onChange={(e) => setStaffId(e.target.value)}>
          <option value="">Select Staff</option>
          {staffs.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>
        <select value={nailId} onChange={(e) => setNailId(e.target.value)}>
          <option value="">Select Nail</option>
          {nails.map((nail) => (
            <option key={nail.id} value={nail.id}>
              {nail.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Reservation</button>
      </form>
    </div>
  );
};

export default AddReservation;
