import React, { useRef, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Input, SimpleButton } from '../../components';
import { SelectChangeEvent } from '@mui/material/Select';
import '@toast-ui/editor/dist/toastui-editor.css';

type Prop = {
  title: string
  setTitle: Function
  submit: () => void
  categories: any[]
  category_id: string,
  setCategory: (e: SelectChangeEvent) => void
}
const PostPresenter = React.forwardRef<HTMLDivElement ,Prop>(({ submit, title, setTitle, categories, category_id, setCategory }, ref) => {
  return (
    <div>
      <Input label='title' value={title} onChange={(e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => setTitle(e.target.value)} />
      <FormControl fullWidth>
        <InputLabel>category</InputLabel>
        <Select
          value={category_id}
          onChange={setCategory}>
          {categories.map((category: any, i: number) => (
            <MenuItem key={i} value={i}>{category.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <div className='editor' ref={ref} />
      <SimpleButton onClick={() => submit()} label='POST' />
    </div>
  )
});

export default PostPresenter;
