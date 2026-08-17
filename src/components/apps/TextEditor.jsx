import React, {useState, useRef} from "react";
import { Download, Upload, FileText, Save } from "lucide-react";


export default function TextEditor() {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('untitled.txt');
  const fileInputRef = useRef(null);


//download THE DAMNNNN FILEEE to the pc~ .txt formatttt
const handleSaveToPC = () => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName.endsWith('.txt') ? fileName : `${fileName}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

// OPENING FROM PC FUCNTIONNNNNNNNNNNNN ahahahahhaA HAH AHAHAHA HA(im sleep deprived T-T)
const handleOpenFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setFileName(file.name);
  const reader = new FileReader();
  reader.onload = (event) => {
    setContent(event.target.result);
  }
  reader.readAsText(file);
};

// I HATE HATE HATEEEEE CSSS AHHHH I HATE ITT!!!! whatever... AI WWILL SAVE MEE
return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-b-xl overflow-hidden">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 border-b border-white/10 gap-2">
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <input 
          type = "text"
          value = {fileName}
          onChange = {(e) => setFileName(e.target.value)}
          className="bg-transparent border border-transparent hover:border-white/10 focus:border-cyan-500 rounded px-1.5 py-0.5 text-xs text-slate-200 outline-none w-36 transition-colors"
          />
          </div>

          <div className="flex item-center gap-1.5">
            {/*Hidden File Input*/}
            <input
            type = "file"
            ref={fileInputRef}
            onChange={handleOpenFile}
            accept = ".txt"
            className = "hidden" 
            />

            <button 
            onClick={()=> fileInputRef.current?.click()}
            className ="flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
            title = "Open file from your PC" >
              
              <Upload className="w-3.5 h-3.5"/>
            </button>

            <button
            onClick={handleSaveToPC}
            className="flex items-center gap-1 px-2.5 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors shadow-sm"
            title="Save file to your PC">

              <Download className="w-3.5 h-3.5"/>
              <Save className="txt"></Save>
              

            </button>

          </div>
        </div>
        
      {/*EDITOR BODYY~*/}
      <textarea 
      value = {content}
      onChange={(e)=> setContent(e.target.value)}
      placeholder="Type whatever you want, i dont judge... Probably~"
      className="flex-1 w-full p-4 bg-slate-950 text-slate-200 font-mono text-sm resize-none outline-none selection:bg-cyan-500/30"
      spellCheck={false}
      />
    </div>
);
}
