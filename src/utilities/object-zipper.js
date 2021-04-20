class ObjectZipper {
    zip(header, values) {
        let data = []

        for (let fields of values) {
            const obj = {}
            for (let i = 0; i<fields.length;i++) {
                obj[header[i]] = fields[i]
            }
            data.push(obj)
        }

        return data
    }
}

export default ObjectZipper