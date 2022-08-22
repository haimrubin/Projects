package components;

import java.awt.Graphics;
import java.util.ArrayList;
import java.util.Random;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <br>This class represents the vehicles for transporting packages.
 * 
 * <p>fields:
 * <br>truckID- Vehicle serial number (integer)
 * <br>licensePlate- Vehicle ID number @String
 * <br>truckModel- Model of vehicle @String
 * <br>available- Vehicle availability (boolean)
 * <br>timeLeft- Time left until the end of the transport (integer)
 * <br>packages - List of packages for transportation that are in the vehicle (ArrayList)
 */

public  abstract class Truck implements Node,Runnable {
	private static int countID=2000;
	final private int truckID;
	private String licensePlate;
	private String truckModel;
	private boolean available=true;
	private int timeLeft=0;
	private ArrayList<Package> packages=new ArrayList<Package>();
	protected int initTime;
	protected boolean threadSuspend = false;
		
	
	//default random constructor
	public Truck() {
		truckID=countID++;
		Random r= new Random();
		licensePlate=(r.nextInt(900)+100)+"-"+(r.nextInt(90)+10)+"-"+(r.nextInt(900)+100);
		truckModel="M"+r.nextInt(5);
	}

	public Truck(String licensePlate,String truckModel) {
		truckID=countID++;
		this.licensePlate=licensePlate;
		this.truckModel=truckModel;
	}
	
	
	public ArrayList<Package> getPackages() {
		return packages;
	}


	public int getTimeLeft() {
		return timeLeft;
	}

	
	public void setTimeLeft(int timeLeft) {
		this.timeLeft = timeLeft;
	}


	@Override
	public String toString() {
		return "truckID=" + truckID + ", licensePlate=" + licensePlate + ", truckModel=" + truckModel + ", available= " + available ;
	}

	/**
	 * Takes care of receiving a package by the implementing department
	 * @param p  an Package
	 */

	@Override
	public synchronized void collectPackage(Package p) {
		setAvailable(false);
		int time=(p.getSenderAddress().street%10+1)*10;
		this.setTimeLeft(time);
		this.initTime = time;
		this.packages.add(p);
		p.setStatus(Status.COLLECTION);
		p.addTracking(new Tracking(MainOffice.getClock(), this, p.getStatus()),p);
		System.out.println(getName() + " is collecting package " + p.getPackageID() + ", time to arrive: "+ getTimeLeft()  );
	}


	@Override
	public synchronized void deliverPackage(Package p) {}


	public boolean isAvailable() {
		return available;
	}
	

	public int getTruckID() {
		return truckID;
	}

	
	public void setAvailable(boolean available) {
		this.available = available;
	}
	
	
	public String getName() {
		return this.getClass().getSimpleName()+" "+ truckID;
	}
	
	public synchronized void setSuspend() {
	   	threadSuspend = true;
	}

	public synchronized void setResume() {
	   	threadSuspend = false;
	   	notify();
	}
	
	public abstract void paintComponent(Graphics g);
	
}
