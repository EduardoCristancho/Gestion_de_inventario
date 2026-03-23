export const checkCameraAvailability = async () => {
  try {
    // 1. Verificamos si el navegador soporta el API
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return false;
    }

    // 2. Listamos todos los dispositivos
    const devices = await navigator.mediaDevices.enumerateDevices();
    
    // 3. Filtramos para ver si hay alguno de tipo 'videoinput'
    const hasCamera = devices.some(device => device.kind === 'videoinput');
    
    return hasCamera;
  } catch (error) {
    console.error("Error verificando cámara:", error);
    return false;
  }
};