export default class{
    constructor(root){
        this.root = root;  
    }

    setHeader(headerColumns){
        this.root.insertAdjacentHTML("afterbegin", `
            <thead>
            <tr>
                ${headerColumns.map(text => `<th>${text}</th>`).join("")}
            </tr>
            </thead>
        `)
    }

    setBodyMain(data){
        const rowHtml = data.map(row=>{
            return `
            <tr id="${row[0]}">
                ${row.map(text => `<td class="mainbutton" >${text}</td>`).join("")}           
            </tr>`;
        });
        this.root.insertAdjacentHTML("beforeend", `
            <tbody>
                ${rowHtml.join("")}
            </tbody>
        `)
    }

    setBodyOther(data){
        const rowHtml = data.map(row=>{
            return `
            <tr>
                ${row.map(text => `<td>${text}</td>`).join("")}           
            </tr>`;
        });
        this.root.insertAdjacentHTML("beforeend", `
            <tbody>
                ${rowHtml.join("")}
            </tbody>
        `)
    }


    update(data, headerColumns = []){
        this.clear();
        this.setHeader(headerColumns);
        this.setBodyMain(data);
    }

    updateOther(data, headerColumns = []){
        this.clear();
        this.setHeader(headerColumns);
        this.setBodyOther(data);
    }

    clear(){
        this.root.innerHTML = "";
    }
}