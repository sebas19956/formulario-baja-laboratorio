"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { PrinterIcon, DownloadIcon } from "lucide-react"

export default function EquipmentDecommissionForm() {
  const [formData, setFormData] = useState({
    equipmentType: "",
    brand: "",
    model: "",
    serialNumber: "",
    inventoryNumber: "",
    hasInventoryNumber: true,
    equipmentStatus: "",
    decommissionReason: "",
    responsibleName: "",
    responsiblePosition: "",
    department: "",
    decommissionDate: new Date().toISOString().split("T")[0],
    observations: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    alert("Formulario de baja registrado correctamente")
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `baja_equipo_${formData.inventoryNumber || "sin_inventario"}_${formData.decommissionDate}.json`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center border-b">
            <CardTitle className="text-2xl font-bold text-gray-800">FORMULARIO DE BAJA DE EQUIPOS</CardTitle>
            <CardDescription className="text-lg">
              Registro para dar de baja equipos tecnológicos y mobiliario
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información del Equipo */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">1. INFORMACIÓN DEL EQUIPO</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="equipmentType">Tipo de Equipo *</Label>
                    <Select
                      value={formData.equipmentType}
                      onValueChange={(value) => setFormData({ ...formData, equipmentType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo de equipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computadora-escritorio">Computadora de Escritorio</SelectItem>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="monitor">Monitor</SelectItem>
                        <SelectItem value="impresora">Impresora</SelectItem>
                        <SelectItem value="telefono">Teléfono</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="proyector">Proyector</SelectItem>
                        <SelectItem value="servidor">Servidor</SelectItem>
                        <SelectItem value="switch">Switch/Router</SelectItem>
                        <SelectItem value="mobiliario">Mobiliario</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Ej: Dell, HP, Lenovo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="Modelo del equipo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serialNumber">Número de Serie</Label>
                    <Input
                      id="serialNumber"
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                      placeholder="Número de serie del fabricante"
                    />
                  </div>
                </div>

                {/* Número de Inventario */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasInventoryNumber"
                      checked={formData.hasInventoryNumber}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, hasInventoryNumber: checked as boolean })
                      }
                    />
                    <Label htmlFor="hasInventoryNumber">El equipo tiene número de inventario</Label>
                  </div>

                  {formData.hasInventoryNumber && (
                    <div className="space-y-2">
                      <Label htmlFor="inventoryNumber">Número de Inventario</Label>
                      <Input
                        id="inventoryNumber"
                        value={formData.inventoryNumber}
                        onChange={(e) => setFormData({ ...formData, inventoryNumber: e.target.value })}
                        placeholder="Número de inventario institucional"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Estado y Motivo de Baja */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">2. ESTADO Y MOTIVO DE BAJA</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="equipmentStatus">Estado del Equipo *</Label>
                    <Select
                      value={formData.equipmentStatus}
                      onValueChange={(value) => setFormData({ ...formData, equipmentStatus: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="funcional">Funcional</SelectItem>
                        <SelectItem value="no-funcional">No Funcional</SelectItem>
                        <SelectItem value="parcialmente-funcional">Parcialmente Funcional</SelectItem>
                        <SelectItem value="desconocido">Estado Desconocido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="decommissionReason">Motivo de Baja *</Label>
                    <Select
                      value={formData.decommissionReason}
                      onValueChange={(value) => setFormData({ ...formData, decommissionReason: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="obsolescencia">Obsolescencia Tecnológica</SelectItem>
                        <SelectItem value="daño-irreparable">Daño Irreparable</SelectItem>
                        <SelectItem value="costo-reparacion">Costo de Reparación Elevado</SelectItem>
                        <SelectItem value="fin-vida-util">Fin de Vida Útil</SelectItem>
                        <SelectItem value="reemplazo">Reemplazo por Equipo Nuevo</SelectItem>
                        <SelectItem value="robo-perdida">Robo o Pérdida</SelectItem>
                        <SelectItem value="reorganizacion">Reorganización Departamental</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Información del Responsable */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">3. INFORMACIÓN DEL RESPONSABLE</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="responsibleName">Nombre Completo *</Label>
                    <Input
                      id="responsibleName"
                      value={formData.responsibleName}
                      onChange={(e) => setFormData({ ...formData, responsibleName: e.target.value })}
                      placeholder="Nombre del responsable"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsiblePosition">Cargo/Posición</Label>
                    <Input
                      id="responsiblePosition"
                      value={formData.responsiblePosition}
                      onChange={(e) => setFormData({ ...formData, responsiblePosition: e.target.value })}
                      placeholder="Cargo o posición"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento/Área</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      placeholder="Departamento o área"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="decommissionDate">Fecha de Baja *</Label>
                    <Input
                      id="decommissionDate"
                      type="date"
                      value={formData.decommissionDate}
                      onChange={(e) => setFormData({ ...formData, decommissionDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">4. OBSERVACIONES ADICIONALES</h3>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observaciones</Label>
                  <Textarea
                    id="observations"
                    value={formData.observations}
                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                    placeholder="Detalles adicionales, condiciones especiales, accesorios incluidos, etc."
                    rows={4}
                  />
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button type="submit" className="flex-1">
                  Registrar Baja
                </Button>
                <Button type="button" variant="outline" onClick={handlePrint} className="flex items-center gap-2">
                  <PrinterIcon className="w-4 h-4" />
                  Imprimir
                </Button>
                <Button type="button" variant="outline" onClick={handleExport} className="flex items-center gap-2">
                  <DownloadIcon className="w-4 h-4" />
                  Exportar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-3">Instrucciones:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Los campos marcados con (*) son obligatorios</li>
              <li>• Si el equipo no tiene número de inventario, desmarque la casilla correspondiente</li>
              <li>• Para equipos con estado desconocido, seleccione "Estado Desconocido"</li>
              <li>• Puede imprimir el formulario o exportar los datos para sus registros</li>
              <li>• Guarde una copia del formulario completado para sus archivos</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
