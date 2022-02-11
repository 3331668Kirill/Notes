import React from "react"

type TypePropsNote = {
    data: Array<string>
    note: Array<string>
    filterTag: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    edit: (index: number) => void
    valueChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    delHashtag: (index: number) => void
    delPost: (index: number) => void
    handleSubmit: (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    setNoteActive: (item: string) => void
    value: string
    active: string
    saveToFile: () => void
}

export const Note = ({   value, active, saveToFile,
                         filterTag, valueChange,
                         handleSubmit, data, setNoteActive,
                         edit, delPost, note, delHashtag
                     }: TypePropsNote) => {

    return (
        <div className="Note">
            <form className="someText">
                <textarea value={value} onChange={valueChange} placeholder="Введите техт"> </textarea>
                <button className="save" onClick={handleSubmit}>Сохранить</button>
                <button className="save" onClick={saveToFile}>Сохранить заметки в файл</button>
                <button className="save" onClick={filterTag}>Фильтр по #</button>
            </form>
            <div className="hashTag">
                {note.length > 0 ? note.map((item, index) =>
                    <div key={index} className='tags'>
                        <li className='someTag'>{item}</li>
                        <button onClick={() => delHashtag(index)} className='delTag'>Удалить</button>
                    </div>
                ) : null}
            </div>
            <ul className='listNote'>
                {data.length > 0 ? data.map((item, index) =>
                    <div key={index} onClick={() => setNoteActive(item)}
                         className={active === item ? 'note_active' : 'notes'}>
                        <li className='someNote'>
                            {item}
                        </li>
                        <button onClick={() => edit(index)} className='changeNote'>Изменить заметку</button>
                        <button onClick={() => delPost(index)} className='delNote'>Удалить заметку</button>
                    </div>
                ) : null}

            </ul>
        </div>
    )
}