import React, { useCallback } from 'react';
import { useStaff } from '../hooks/reservatio.hook.staff';
import { DropdownMenuType, useDropdownMenu } from '../store/reservation.store.dropdownmenu';
import { Icon } from '../../common/common.components';
import { ModalType, useModalStore } from '../store/reservation.store.modal';

type Props = {};
const StaffList: React.FC<Props> = () => {
  const { staffs } = useStaff();
  const setDropdownMenuType = useDropdownMenu((state) => state.setDropdownMenuType);
  const setModalType = useModalStore((state) => state.setModalType);

  const handleDropdownMenu = useCallback((e: React.MouseEvent, staffId: string) => {
    e.stopPropagation();
    setDropdownMenuType(
      DropdownMenuType.controlStaff,
      { x: e.clientX, y: e.clientY },
      { staffId },
    );
  }, [setDropdownMenuType]);

  return (
    <div>
      <div className="flex items-center">
        <h2 className="text-2xl font-bold mr-2">직원 목록</h2>
        <Icon
          name="person_plus_fill"
          size={24}
          onClick={() => setModalType(ModalType.AddStaff)}
        />
      </div>
      <div className="flex">
        {staffs.length === 0 && <div>직원이 없습니다. 직원을 추가하세요</div>}
        {staffs.map((staff) => (
          <div key={staff.id} className="w-24 h-16 bg-gray-200 m-1 p-1 rounded justify-center items-center flex flex-col relative">
            <div className="flex justify-center">
              <Icon name="person_vcard_fill" size={24} />
            </div>
            <p>{staff.name}</p>
            <div className="absolute top-1 right-1 hover:bg-gray-300 rounded-full p-1 cursor-pointer">
              <Icon
                name="three_dots_vertical"
                size={18}
                onClick={(e) => handleDropdownMenu(e, staff.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffList;
