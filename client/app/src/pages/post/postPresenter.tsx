import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Input, SimpleButton } from '../../components';
import { SelectChangeEvent } from '@mui/material/Select';
import * as style from './style';
import '@toast-ui/editor/dist/toastui-editor.css';

type Prop = {
  title: string
  setTitle: Function
  submit: () => void
  categories: any[]
  category_id: string,
  setCategory: (e: SelectChangeEvent) => void
  openModal: () => void
}
const PostPresenter = React.forwardRef<HTMLDivElement ,Prop>(({
  submit,
  title,
  setTitle,
  categories,
  category_id,
  setCategory,
  openModal
}, ref) => {

  return (
    <style.div>
      <style.sub>
        <Input label='title' value={title} onChange={(e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => setTitle(e.target.value)} />
        <FormControl fullWidth>
          <InputLabel>category</InputLabel>
          <Select
            value={category_id}
            label='category'
            onChange={setCategory}>
            {categories.map((category: any, i: number) => (
              <MenuItem key={i} value={category.id}>{category.name}</MenuItem>
            ))}
            <MenuItem value={-1} onClick={() => {
              openModal();
            }}>+ 추가</MenuItem>
          </Select>
        </FormControl>
      </style.sub>
      <div className='editor' ref={ref} style={{ marginBottom: '2rem' }}/>
      <SimpleButton onClick={() => submit()} label='POST' />
    </style.div>
  )
});

export default PostPresenter;
