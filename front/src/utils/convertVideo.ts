export async function convertVideo(file: File) {
    const formData = new FormData();
    formData.append('video', file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/convert`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to convert video');
    }

    // Descargar el archivo convertido
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_video.mp4';
    a.click();
    window.URL.revokeObjectURL(url);
}
