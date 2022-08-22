package components;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <br>This interface Represents the location of a package
 * 
 * <br>methods:
 *<br>getName - return String of the node type (Branch+branch number or van/standardTruck/NonstandardTruck + truck ID)
 *<br>collectPackage - adds a package to the implementing class
 *<br>deliverPackage - remove a package from the implementing class
 *<br>work - Performs a work unit
 */

public interface Node {
	public void collectPackage(Package p);
	public void deliverPackage(Package p);
	public void work();
	public String getName();
}
