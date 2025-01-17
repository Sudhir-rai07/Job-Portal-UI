export const formatDate = (date: Date) => {
    const formatDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })

    return formatDate
}