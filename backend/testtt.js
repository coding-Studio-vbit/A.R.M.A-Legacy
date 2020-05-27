const Facultyoptions = [
        { label: "Principal", value: "Principal" },
        { label: "Vice Principal", value: "Vice Principal" },
        { label: "CSE - HOD", value: "CSE - HOD" },
        { label: "IT - HOD", value: "IT - HOD" },
        { label: "ECE - HOD", value: "ECE - HOD" },
        { label: "EEE - HOD", value: "EEE - HOD" },
        { label: "CIVIL - HOD", value: "CIVIL - HOD" },
        { label: "MECH - HOD", value: "MECH - HOD" }
]

var arr = []
Facultyoptions.forEach(item =>{
    arr.push(item.value)
    console.log(item.value)}
    )
    console.log(arr)