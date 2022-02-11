import React, {useState} from 'react';
import {Note} from "./Note";


const Form = () => {
    const [value, setValue] = useState<string>('')
    const [tag, setTag] = useState<string>('')
    const [data, setData] = useState<Array<string>>([])
    const [note, setNote] = useState<Array<string>>([])
    const [active, setActive] = useState<string>('')

    const setNoteActive = (item: any) => {
        setValue(item)
        setActive(item)
    }

    const filterTag = (e: any) => {
        e.preventDefault();
        let array = note.map(t => t)
        setData(array)
    }

    const valueChange = (e: any) => {
        let value = e.currentTarget.value
        setValue(value)
        let val = value.split(/(#[a-z\d-]+)/ig);
        for (let i = 0; i < val.length; i++) {
            if (val[i].charAt(0) === "#") {
                setTag(val[i])
            }
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setData(data.concat(value))
            if (tag.length > 0) {
                setNote(note.concat(tag))
            }
        setValue('')
        setTag('')
    }

    const saveToFile = () => {
        let json = data
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(json, null, 2)], {
            type: 'application/json'
        }));
        a.setAttribute("download", "data.json");
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
    }

    const delPost = (index: any) => {
        let arr = data.map(t => t);
        arr.splice(index, 1)
        setData(arr)
        setValue('')
    }

    const delHashtag = (index: any) => {
        let tag = note.map(t => t);
        let val = value;
        let del = tag.splice(index, 1)
        // @ts-ignore
        let clearTag = val.substring(0, val.length - 1).replace(del, '');
        setNote(tag)
        setValue(clearTag)

    }
    const edit = (index: any) => {
        let val = value;
        let arr = data.map(t => t);
        arr.splice(index, 1, val)
        setData(arr)
        setValue('')
    }

    return (
        <div>
            <Note
                value={value}
                data={data}
                note={note}
                valueChange={valueChange}
                delHashtag={delHashtag}
                delPost={delPost}
                edit={edit}
                handleSubmit={handleSubmit}
                setNoteActive={setNoteActive}
                filterTag={filterTag}
                active={active}
                saveToFile={saveToFile}
            />
        </div>
    );

}
export default Form;
